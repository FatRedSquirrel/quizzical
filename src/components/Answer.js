export default function Answer(props) {

    let styles = {
        backgroundColor: props.isChosen ? "#D6DBF5" : "transparent",
        border: props.isChosen ? "0.794239px solid transparent" : "0.794239px solid #4D5B9E",
        opacity: 1,
        cursor: "pointer"
    }

    if (props.isGameOver) {
        if (props.correct) {
            styles = {
                backgroundColor: "#94D7A2",
                border: "0.794239px solid transparent",
                opacity: 1
            }
        } else if (props.isChosen && !props.correct) {
            styles = {
                backgroundColor: "#F8BCBC",
                border: "0.794239px solid transparent",
                opacity: 0.5
            }
        } else {
            styles = {
                backgroundColor: "transparent",
                border: "0.794239px solid #4D5B9E",
                opacity: 0.5
            }
        }
    }

    return (
        <div
            id={props.id}
            style={styles}
            className="answer"
            onClick={props.isGameOver ? () => {
            } : props.chooseAnswer}>
            {props.body}
        </div>
    )
}
