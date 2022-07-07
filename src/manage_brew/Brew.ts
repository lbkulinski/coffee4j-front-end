type Brew = {
    id: number,
    timestamp: string,
    coffee: {
        id: number,
        name: string
    },
    water: {
        id: number,
        name: string
    },
    brewer: {
        id: number,
        name: string
    },
    filter: {
        id: number,
        name: string
    },
    vessel: {
        id: number,
        name: string
    }
}

export default Brew;