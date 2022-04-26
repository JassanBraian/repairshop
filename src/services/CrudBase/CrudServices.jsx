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