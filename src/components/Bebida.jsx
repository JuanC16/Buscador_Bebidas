import { Col, Card, Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const Bebida = ({bebida}) => {

    const {strDrink,strDrinkThumb,idDrink} = bebida

    const {handleModalClick, handleBebidaId} = useBebidas()

  return (
    <Col md={6} lg={3}>
        <Card className="mb-4">
            <Card.Img
                variant="top"
                src={strDrinkThumb}
                alt={`Imagen de ${strDrink}`}
            />
            <Card.Body>
                <Card.Title>{strDrink}</Card.Title>
                <Button
                    variant={'warning'}
                    className="w-100 text-uppercase mt-2"
                    onClick={()=>{
                        handleModalClick()
                        handleBebidaId(idDrink)
                    }}
                >
                    Ver Receta
                </Button>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default Bebida