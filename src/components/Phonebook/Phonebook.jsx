import { useState, useMemo } from "react";
import { nanoid } from 'nanoid';
import { data } from "components/Data/Data";
import { Section } from "./Section/Section";
import ContactForm  from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import useLocalStorage from "hooks/localStorage";

export default function Phonebook() {
    const [contacts, setContacts] = useLocalStorage("contacts", data);
    const [filter, setFilter] = useState('');

    const deleteContact = contactId => {
        setContacts(contacts.filter(({ id }) => id !== contactId));
    };

    const addContact = data => {
        const { name, number } = data;
        const searchSameName = contacts.find(cont => cont.name === name);

        if (searchSameName) {
            return alert(`${data.name} is already in contacts`); 
        } else if (name.length === 0) {
            return alert("Fields must be filled!")
        }

        setContacts(contacts => [...contacts, { id: nanoid(), name, number }]);
    };

    const changeFilter = e => {
        setFilter(e.currentTarget.value);
    };

    const visibleContacts = useMemo(() => {
        return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
    }, [filter, contacts]);

    return (
        <div>
            <Section title="Phonebook">
                <ContactForm addUser={addContact} />
            </Section>
            <Section title="Contacts">
                <Filter value={filter} onChange={changeFilter} />
                {visibleContacts.length > 0 && (
                    <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
                )}
            </Section>
        </div>
    );
};

// export class Phonebook extends Component {
//     state = {
//         contacts: data,
//         filter: '',
//     };

//     componentDidMount() {
//         const contacts = localStorage.getItem("contacts");
//         const parsetContacts = JSON.parse(contacts);
//         if (parsetContacts) {
//             this.setState({ contacts: parsetContacts });
//         }
//     };

//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.contacts !== prevState.contacts) {
//             localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//         }
//     };

//     deleteContact = contactId => {
//         this.setState(prevState => ({
//             contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//         }));
//     };

//     addContact = data => {
//         const searchSameName = this.state.contacts.map((cont) => cont.name).includes(data.name);

//         if (searchSameName) {
//             alert(`${data.name} is already in contacts`);
//             return true;       // To handle reset method not to delete user name and phone number 
//         } else if (data.name.length === 0) {
//             return alert("Fields must be filled!")
//         }

//         const newContact = {
//             ...data,
//             id: nanoid(),
//         };

//         this.setState(prevState => ({
//             contacts: [...prevState.contacts, newContact],
//         }));
//     };

//     changeFilter = (e) => {
//         this.setState({ filter: e.currentTarget.value });
//     };

//     render() {
//         const { filter } = this.state;
//         const normalizedFilter = this.state.filter.toLowerCase();
//         const visibleContacts = this.state.contacts.filter((contact) =>
//             contact.name.toLowerCase().includes(normalizedFilter),
//         );

//         return (
//             <div>
//                 <Section title="Phonebook">
//                     <ContactForm addUser={this.addContact} />
//                 </Section>
//                 <Section title="Contacts">
//                     <Filter value={filter} onChange={this.changeFilter} />
//                     {visibleContacts.length > 0 && (
//                         <ContactList contacts={visibleContacts} deleteContact={this.deleteContact} />
//                     )}
//                 </Section>
//             </div>
//         );
//     };
// };