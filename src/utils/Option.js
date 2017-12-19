export const Some = x => ({
    map: f => Some(f(x)),
    flatMap: f => f(x),
    fold: (ifEmpty, f) => f(x),
});

export const None = {
    map: f => None,
    flatMap: f => None,
    fold: (ifEmpty, f) => ifEmpty(),
};

export const EqOption = (x,y) => JSON.stringify(x.fold(_ => {},_ => _)) === JSON.stringify(y.fold(_ => {},_ => _));

export const Option = x => (x === undefined || x === null) ? None : Some(x);

export const sequence = (listOfOptions) => Option(listOfOptions.reduce((a,b) => b.fold(_ => a,x => [...a,x]),[]));