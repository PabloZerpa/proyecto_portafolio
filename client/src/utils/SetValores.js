

export const SetValores = (e, setDatos) => {

    if(e.target.value === 'TODAS')
        setDatos({ ...datos, [e.target.name] : null });
    else
        setDatos({ ...datos, [e.target.name] : e.target.value });

}