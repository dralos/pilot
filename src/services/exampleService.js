import axios from "axios";

const exampleMocData = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
    },
    {
        name: 'Eclair',
        calories: 262,
    },
    {
        name: 'Cupcake',
        calories: 305,
    },
    {
        name: 'Gingerbread',
        calories: 356,
    },
    {
        name: 'Jelly bean',
        calories: 375,
    },
    {
        name: 'Lollipop',
        calories: 392,
    },
    {
        name: 'Honeycomb',
        calories: 408,
    },
    {
        name: 'Donut',
        calories: 452,
    },
    {
        name: 'KitKat',
        calories: 518,
    },
]

export const exampleGet = async () => {
    // make call to BE here
    try {
        return new Promise((res, rej) => {
            setTimeout(()=> res(exampleMocData), 3000)
        })
    } catch (error) {
        throw new Error("error.unknown")
    }
}
