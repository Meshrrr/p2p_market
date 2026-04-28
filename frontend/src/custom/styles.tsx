export const selectStyles = {
    control: (provided: any) => ({
        ...provided,
        width: "300px",
        fontSize: "20px",
        borderRadius: "15px",
        border: "1px solid #B5B5B5",
        boxShadow: "none",
        padding: "8px 16px",
        "&:hover": {
            border: "1px solid #B5B5B5",
        },
    }),

    menu: (provided: any) => ({
        ...provided,
        width: "400px",
        borderRadius: "15px",
    }),

    option: (provided: any, state: any) => ({
        ...provided,
        maxWidth: "400px",
        backgroundColor: state.isSelected ? "#FFAA72" : state.isFocused ? "#FFAA72" : "white",
        color: state.isSelected ? "white" : "black",
        padding: "8px 16px",
        fontSize: "18px",
        borderRadius: "15px",
    }),

    singleValue: (provided: any) => ({
        ...provided,
        color: "#000",
    }),
}