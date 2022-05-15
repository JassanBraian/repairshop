import Swal from "sweetalert2";

export const createObj = async (objCre, urlCre) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objCre),
        };

        const req = await fetch(urlCre, config);

        if (req.status === 201) {
            Swal.fire(
                'Created object',
                'The object was created successfully',
                'success'
            );
            return true;
        }

    } catch (error) {
        Swal.fire(
            'An error occurred',
            'Sorry. An unexpected error occurred, try the operation later',
            'warning'
        );
        return false;
    }
}

export const updateObj = async (objUpd, urlUpd) => {
    try {
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objUpd),
        };

        const req = await fetch(urlUpd, config);

        if (req.status === 200) {
            Swal.fire(
                'Edited object',
                'The object was edited successfully',
                'success'
            );
            return true;
        }
    } catch (error) {
        Swal.fire(
            'An error occurred',
            'Sorry. An unexpected error occurred, try the operation later',
            'warning'
        );
        return false;
    }
}

export const deleteObj = async (objDel, urlDel) => {
    try {
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objDel),
        };

        const req = await fetch(urlDel, config);

        if (req.status === 200) {
            Swal.fire(
                'Deleted object',
                'The object was deleted successfully',
                'success'
            );
            return true;
        }

    } catch (error) {
        Swal.fire(
            'An error occurred',
            'Sorry. An unexpected error occurred, try the operation later',
            'warning'
        );
        return false;
    }
}

export const getButtonLabel = (ope) => {
    let label = "";
    switch (ope) {
        case "create":
            label = "Create";
            break;
        case "read":
            label = "Save";
            break;
        case "update":
            label = "Save";
            break;
        case "delete":
            label = "Delete";
            break;
        default:
            break;
    }
    return label;
}