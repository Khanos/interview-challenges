const Blocks = [
    {
        gym: false,
        school: true,
        store: false,
    },
    {
        gym: true,
        school: false,
        store: false,
    },
    {
        gym: true,
        school: true,
        store: false,
    },
    {   
        gym: false,
        school: true,
        store: false,
    },
    {
        gym: false,
        school: true,
        store: true,
    },
    {
        gym: true,
        school: true,
        store: true,
    }
];
const Reqs = ['gym', 'school', 'store'];

const myNextapartment = (reqs, blocks) => {
    const prospects = [];
    for (let i = 0; i < blocks.length; i++) {
        const prev = i-1;
        const curr = i;
        const next = i+1;

        const prospectApartment = reqs.reduce((acc, el) => {
            acc[el] = blocks[curr][el] || (blocks[prev] ? blocks[prev][el] : false) || (blocks[next] ? blocks[next][el] : false);
            if (acc.likehood){
                acc.likehood += blocks[curr][el] ? 1 : 0;
            } else {
                acc.likehood = blocks[curr][el] ? 1 : 0;
            }
            return acc;
        }, {});
        prospectApartment.id = i;
        prospects.push(prospectApartment);
    }
    return prospects.sort((prev, next) => next.likehood - prev.likehood).filter(el => {
        return reqs.every(req => el[req]);
    }).shift();
}
const winner = myNextapartment(Reqs, Blocks);
console.log('end')