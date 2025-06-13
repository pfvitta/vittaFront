import CardProvider from "../CardProvider/CardProvider"


function Providers() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10">
    <CardProvider
        name="Maria Jimenez"
        imageUrl="/FotoPerfilProvider.jpg"
        tags={["Veganismo", "Obesidad"]}
        description="Subheading that sets up context, shares more info about the author, or generally gets people psyched to keep reading" id={""}/>
    <CardProvider
        name="Juan Perez"
        imageUrl="/FotoPerfilProvider2.jpg"
        tags={["Diabetes", "Trastornos alimenticios"]}
        description="Subheading that sets up context, shares more info about the author, or generally gets people psyched to keep reading" id={""}/>
    <CardProvider
        name="Romina Lopez"
        imageUrl="/FotoPerfilProvider3.jpg"
        tags={["Obesidad", "Hipotiroidismo"]}
        description="Subheading that sets up context, shares more info about the author, or generally gets people psyched to keep reading" id={""}/>
  </div>
  )

}

export default Providers