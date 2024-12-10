function Nutrition({label, quantity, unit}, index){
    return(
            <p key = {index}><b>{label}</b> - {quantity} {unit}</p>
    )
}

export default Nutrition;