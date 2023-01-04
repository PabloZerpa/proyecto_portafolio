
const respuestaError = (res, message, code) => {
    
    res.send({ error: message });
};

module.exports = { respuestaError };