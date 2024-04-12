import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites, getHistory } from "@/lib/userData";
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { getToken } from '@/lib/authenticate';



export default function Login(props) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    


    async function handleSubmit(e) {
        
        e.preventDefault();
        try {
            await authenticateUser(user, password);
            await updateAtoms();
            router.push('/favourites');
        } catch (err) {
            setWarning(err.message);
        }
    }

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }


        return (
            <>
                <Card bg="light">
                    <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
                </Card>
                <br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>User:</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Button variant="primary" className="pull-right" type="submit">Login</Button>
                    {warning && (<><br /><br /><Alert variant="danger">{warning}</Alert></>)}
                </Form>
            </>
        );
    }


