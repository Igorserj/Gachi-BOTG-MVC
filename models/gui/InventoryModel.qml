import QtQuick 2.15

ListModel {

    ListElement {
        name: "Hero inventory cells"
        type: "Cells"
        columns: 5
        cellList: [
            ListElement { type: "Bag" },
            ListElement { type: "Bag" },
            ListElement { type: "Bag" },
            ListElement { type: "Bag" },
            ListElement { type: "Bag" },
            ListElement { type: "Bag" }
        ]
        metadataList: [
            ListElement { name: "Zalupa"; type: "One hand" },
            ListElement { name: "" },
            ListElement { name: "" },
            ListElement { name: "" },
            ListElement { name: "" },
            ListElement { name: "" }
        ]
    }
    ListElement {
        name: "Hero equipment cells"
        type: "Cells"
        columns: 4
        cellList: [
            ListElement { type: "Head" },
            ListElement { type: "Torso" },
            ListElement { type: "Legs" },
            ListElement { type: "Feet" },
            ListElement { type: "Left hand" },
            ListElement { type: "Right hand" },
            ListElement { type: "Two hands" }
        ]
        metadataList: [
            ListElement { name: "" },
            ListElement { name: "" },
            ListElement { name: "" },
            ListElement { name: "" },
            ListElement { name: "" },
            ListElement { name: "" },
            ListElement { name: "" }
        ]
    }

    // ListElement {
    //     name: "Enemy inventory cells"
    //     type: "Cells"
    //     columns: 5
    //     cellList: [
    //         ListElement { type: "Bag" },
    //         ListElement { type: "Bag" },
    //         ListElement { type: "Bag" },
    //         ListElement { type: "Bag" },
    //         ListElement { type: "Bag" },
    //         ListElement { type: "Bag" }
    //     ]
    //     metadataList: [
    //         ListElement { name: "Penis"; type: "Head" },
    //         ListElement { name: "" },
    //         ListElement { name: "" },
    //         ListElement { name: "" },
    //         ListElement { name: "" },
    //         ListElement { name: "" }
    //     ]
    // }
    // ListElement {
    //     name: "Enemy equipment cells"
    //     type: "Cells"
    //     columns: 4
    //     cellList: [
    //         ListElement { type: "Head" },
    //         ListElement { type: "Torso" },
    //         ListElement { type: "Legs" },
    //         ListElement { type: "Feet" },
    //         ListElement { type: "Left hand" },
    //         ListElement { type: "Right hand" },
    //         ListElement { type: "Two hands" }
    //     ]
    //     metadataList: [
    //         ListElement { name: "" },
    //         ListElement { name: "" },
    //         ListElement { name: "" },
    //         ListElement { name: "" },
    //         ListElement { name: "" },
    //         ListElement { name: "" },
    //         ListElement { name: "" }
    //     ]
    // }
}
