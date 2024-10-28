export default function ListItem(props) {
    return (
        <option id={props.id} value={props.name} name={props.name} >{props.name}</option>
    );
}