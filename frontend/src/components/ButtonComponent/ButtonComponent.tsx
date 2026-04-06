import './ButtonComponent.scss'

export const ButtonComponent = ({...props}) => {
    return (
        <button {...props}>
            { props.children }
        </button>
    )
}