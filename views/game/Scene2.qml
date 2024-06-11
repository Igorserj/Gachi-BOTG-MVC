import QtQuick 2.15
import QtQuick3D
import QtQuick3D.Helpers

View3D {
    anchors.fill: parent

    PerspectiveCamera {
        id: camera
        position: Qt.vector3d(.0, .0, 300.)
    }

    DirectionalLight {
        id: light
    }

    Model {
        id: cube
        property double rotY: 0
        property double posX: 0
        source: "#Sphere"
        position: Qt.vector3d(0., posX, .0)
        rotation: Quaternion.fromEulerAngles(25, rotY, 0)
        materials: PrincipledMaterial {
            baseColor: "yellow"
        }
    }
    Model {
        source: "#Cube"
        position: Qt.vector3d(0., .0, .0)
        materials: PrincipledMaterial {
            baseColor: "gray"
        }
    }

    Timer {
        interval: 50
        repeat: true
        running: true
        onTriggered: {
            cube.posX+=2.
        }
    }
}
