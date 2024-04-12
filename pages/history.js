import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter()
    if(!searchHistory) return null;

    let parsedHistory = []

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    })

    function historyClicked(e, index) {
        router.push('/artwork?' + searchHistory[index])
    }
    
    async function removeHistoryClicked(e, index) {
        e.stopPropagation()
        setSearchHistory(await removeFromHistory(searchHistory[index])) 
    }

    if(parsedHistory.length > 0) {
        return (
            <>
            <ListGroup>
                {parsedHistory.map((historyItem, index) => {
                    return (
                        <ListGroup.Item className={styles.historyListItem} onClick={(e) => historyClicked(historyItem, index)}>
                            {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            </>
        )
    } else {
        return(<><Card><p><br /><h4>Nothing Here</h4>Try searching for some artwork.</p></Card></>)
    }

}