export default function Modal(props) {
    return (
        <div className="modal">
            <h1 className="modal__title">Quizzical</h1>
            <p className="modal__description">Game where you can answer some nice questions</p>
            <button onClick={props.closeModal} className="button">Start quiz</button>
        </div>
    )
}
