import { favouritesAtom } from '@/store';
import { useAtom } from 'jotai';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    if(!favouritesList) return null;


    if (favouritesList) {
        return (
            <>
                <Row className="gy-4">
                    {favouritesList.length > 0 ? favouritesList.map((artwork) => {
                        return <Col lg={3} key={artwork}><ArtworkCard objectID={artwork} /></Col>
                    }) : <Card><p><br /><h4>Nothing Here</h4>Try adding some new artwork to the list.</p></Card>}
                </Row>
            </>
        )
    } else {
        return null
    }
}