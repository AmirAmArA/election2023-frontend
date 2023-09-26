import PageComponent from "./PageComponent"

type PageParams = {
    params:string[]
}

const page = ({ params }: { params: PageParams }) => {

    return <PageComponent city={params.params[0]} votes={params.params[1]}/>
}

export default page