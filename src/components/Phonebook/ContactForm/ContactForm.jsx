import { useState } from "react";
import { Button, Form, Input, Label } from "./ContactForm.styled";

export default function ContactForm({addUser}) {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case "name": setName(value);
                break;
            case "number": setNumber(value);
                break;
            default: return;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        addUser({ name, number });
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label>Name:
                <Input
                    id={name}
                    value={name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </Label>
            <Label>Number:
                <Input
                    id={number}
                    value={number}
                    onChange={handleChange}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </Label>
            <Button type="submit">Add contact</Button>
        </Form>
    );
};

// export class ContactForm extends Component {
//     state = {
//         name: '',
//         number: '',
//         contacts: data,
//     };


//     handleChange = ({ target: { name, value } }) => {
//         this.setState({
//             [name]: value,
//         });
//     };

//     handleSubmit = event => {
//         event.preventDefault();

//         if (!this.props.addUser({ ...this.state })) {
//             this.reset();
//         }
//     };


//     reset = () => {
//         this.setState({ name: '', number: '' });
//     }

//     render() {
//         const { name, number } = this.state;

//         return (
//             <Form onSubmit={this.handleSubmit}>
//                 <Label>Name:
//                     <Input
//                         value={name}
//                         onChange={this.handleChange}
//                         type="text"
//                         name="name"
//                         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                         required
//                     />
//                 </Label>
//                 <Label>Number:
//                     <Input
//                         value={number}
//                         onChange={this.handleChange}
//                         type="tel"
//                         name="number"
//                         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                         required
//                     />
//                 </Label>
//                 <Button type="submit">Add contact</Button>
//             </Form>
//         );
//     };
// };