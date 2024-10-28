function NewsCard(props) {

    return (

        <>
            <div className="size-48 bg-cover flex justify-end flex-col" style={{ backgroundImage: `url(${props.image})` }}>
                <h1 className="m-4">{props.title}</h1>
                <div className="visible hover:invisible">
                    <p className="m-4 text-center" >{props.content}</p>
                </div>
            </div>

        </>
    );
}

export default NewsCard;