import format from "date-fns/format";

// Validaciones generales

const expresions = {
    expCorreo:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    expNum: /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/,
    expDni: /^\d{8}(?:[-\s]\d{4})?$/,
    expAfil: /^[0-9]/,
};

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const validateStr = (objCampo, objCampoRef, opeCrud, verfExis, funcExis) => {
    const objCampoOk = objCampo.trim();
    const objCampoRefOk = objCampoRef.trim();
    let res = false;
    if (opeCrud === "create" && !!objCampoOk) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    } else if (opeCrud !== "create" && !!objCampoRefOk) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    }
    return res;
}

export const validateMail = (objCampo, objCampoRef, opeCrud, verfExis, funcExis) => {
    const objCampoOk = objCampo.trim();
    const objCampoRefOk = objCampoRef.trim();
    const cond = expresions.expCorreo;
    let res = false;
    if (opeCrud === "create" && !!objCampoOk && cond.test(objCampo)) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    } else if (opeCrud !== "create" && !!objCampoRefOk && cond.test(objCampoRef)) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    }
    return res;
}

export const validateInt = (objCampo, objCampoRef, opeCrud, verfExis, funcExis) => {
    const cond = expresions.expNum;
    let res = false;
    if (opeCrud === "create" && !!objCampo && cond.test(objCampo.toString())) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    } else if (opeCrud !== "create" && !!objCampoRef && cond.test(objCampoRef.toString())) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    }
    return res;
}

export const validateDni = (objCampo, objCampoRef, opeCrud, verfExis, funcExis) => {
    const objCampoOk = objCampo.trim();
    const objCampoRefOk = objCampoRef.trim();
    const cond = expresions.expDni;
    let res = false;
    if (opeCrud === "create" && !!objCampoOk && cond.test(objCampo)) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    } else if (opeCrud !== "create" && !!objCampoRefOk && cond.test(objCampoRef)) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    }
    return res;
}

export const validateDate = (objCampo, objCampoRef, opeCrud, verfExis, funcExis) => {
    const objCampoOk = Date.parse(objCampo.trim());
    const objCampoRefOk = Date.parse(objCampoRef.trim());
    // Pendiente validar fecha minima hoy y maxima 3 meses
    const fechaActual = format(new Date(), "yyyy/MM/dd");
    let res = false;
    if (opeCrud === "create" && !!objCampoOk) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    } else if (opeCrud !== "create" && !!objCampoRefOk) {
        if (verfExis && !funcExis) {
            res = true;
        } else if (!verfExis) res = true;
    }
    return res;
}

// Validaciones de existencia específica

export const existDescrip = (str, opeCrud, objId, objList) => {
    const strOk = str.toLowerCase().trim();
    let res = false;
    if (opeCrud === "create") {
        objList.forEach(obj => {
            if (obj.descrip.toLowerCase().trim() === strOk)
                res = true;
        });
    } else if (opeCrud !== "create") {
        objList.forEach(obj => {
            if (obj.descrip.toLowerCase().trim() === strOk
                && obj.id !== objId) {
                res = true;
            }
        });
    }
    return res;
}