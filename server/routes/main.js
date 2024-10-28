import express from 'express';
import News from '../models/news.js';
import User from '../models/user.js';
import Country from '../models/country.js';
import Continent from '../models/continents.js';
import Trip from '../models/trips.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';


const router = express.Router();

// Multer upload setup

const tripStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/trip-images')
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + file.originalname)
    }
});

const tripUpload = multer({ storage: tripStorage });

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const profileUpload = multer({ storage: profileStorage });

// Authentication setup

const saltRounds = 10;

const authenticate = (req, res, next) => {

    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: "You need an account to view this page" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "You need an account to view this page" });
            }
            req.userId = decoded.id
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: "You need an account to view this page" });

    }
}

router.get('/home', authenticate, async (req, res) => {
    const news = await News.find();

    res.json({ news });
});

router.post('/signup', profileUpload.single('avatar'), async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const avatar = req.file.filename;
        const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] })
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log("Error hashing password", err);
            } else {
                if (!existingUser) {
                    const user = await User.create({ username: username, password: hash, email: email, avatar: `./images/avatars/${avatar}` });
                    await user.save();
                    res.status(201).send({ message: "User created successfully" })
                } else {
                    res.status(406).json({ message: "User already exists bro" })
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }

})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(401).json({ message: "Invalid credentials" });
                } else {
                    if (result) {
                        res.clearCookie("auth_token");

                        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", });

                        res.cookie("auth_token", token)
                            .status(200).json({ message: "User logged in successfully" });

                    } else {
                        res.status(401).json({ message: "Invalid credentials" });
                    }
                }
            })
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
})
//logout and logged user 

router.get('/', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: "User not found" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    try {
        res.clearCookie("auth_token");
        res.status(200).json({ message: "User logged out successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Fetch the countries and continents from the database


router.get('/continents', async (req, res) => {
    try {
        const continents = await Continent.find()
        res.status(200).json(continents)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/countries/:id', async (req, res) => {
    try {

        const continent = await Continent.findById(req.params.id)
        console.log("selected continent: ", continent.name)
        const result = await Promise.all(continent.countries.map(async (country) => await Country.findById(country)))
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



// Fetch trips from a country in Trip Search

router.get('/trips/:id', async (req, res) => {
    try {
        const country = await Country.findById(req.params.id);
        if (country) {
            console.log("trips: ", country.trips)
            const result = await Promise.all(country.trips.map(async (trip) => await Trip.findById(trip).populate('postedBy', 'username')));
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Post a trip - NEED TO ADD IMAGE UPLOAD LOGIC

router.post('/post-trip/:id', authenticate, tripUpload.array('images', 3), async (req, res) => {
    try {
        const countryId = req.params.id;
        console.log(req.body);
        console.log(req.files);
        const fileList = req.files.map(file => `/images/trip-images/${file.filename}`);
        console.log(fileList);



        const { title, description, startDate, endDate, budget } = req.body;

        const user = await User.findById(req.userId);
        const country = await Country.findById(countryId);
        const newTrip = await Trip.create({
            title: title,
            destination: country.name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            budget: budget,
            postedBy: user._id,
            images: fileList,
        });
        await newTrip.save();
        console.log(newTrip)
        await Country.findByIdAndUpdate(countryId, { $push: { trips: newTrip._id } });
        res.status(201).json({ message: "Trip posted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// Post Profile changes - NEED TO ADD IMAGE UPLOAD LOGIC AND MODIFY POFILE PAGE

router.patch('/profile/:userId', authenticate, profileUpload.single('avatar'), async (req, res) => {
    try {
        const updates = {};
        for (const key in req.body) {
            if (req.body[key].trim() !== '') {
                updates[key] = req.body[key];
            }
            if (key === 'password') {
                const hashedPassword = await bcrypt.hash(req.body[key], saltRounds);
                updates[key] = hashedPassword;
            }
        }
        if (req.file) {
            updates.avatar = `/images/avatars/${req.file.filename}`
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No updates for the user profile" })
        }

        console.log(updates);
        const result = await User.findByIdAndUpdate(req.userId, { $set: updates });
        res.status(201).json({ message: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router;

// CONSTRUCTORS


// async function getACountry() {
//     const country = await Country.find()
//     const continent = await Continent.find()
//     console.log(continent)
//     country.forEach((country) => {
//         continent.forEach(async (continent) => {
//             if (country.continent.toString() === continent._id.toString()) {
//                 await Continent.findByIdAndUpdate(continent._id, { $push: { countries: country._id } })
//                 console.log("added")
//             }
//             console.log(continent._id === country.continent)
//         })
//     })

// }

// async function getCountry() {
//     const country = await Country.find()
//     const continent = await Continent.find()
//     continent.forEach((continent) => {
//         console.log(continent.name)
//         country.forEach(async (country) => {
//             if (continent.countries.includes(country._id)) {
//                 console.log(country.name)

//             }
//         })
//     })
// }

// getCountry()

//import world from '../world.js';
// const values = [world.map((item) => item.continent)]


// const data = []
// values[0].forEach((item) => {
//     if (!data.includes(item)) {
//         data.push(item)
//     }
// })

// data.forEach(async (continent) => {
//     const cont = await Continent.findOne({ name: continent })
//     world.forEach(async (item) => {

//         const existingCountry = await Country.findOne({ name: item.country, continent: cont })
//         if (!existingCountry) {
//             await Country.create({ name: item.country, continent: cont })
//         }

//     })
// })

// async function createCountries() {
//     const continents = await Continent.find();
//     world.forEach(async (item) => {
//         const existingCountry = await Country.findOne({ name: item.country })
//         const continent = await Continent.findOne({ name: item.continent })
//         if (!existingCountry) {

//             await Country.create({ name: item.country, continent: continent._id })
//         }
//     })
//     console.log("completed addng countries")
// }


