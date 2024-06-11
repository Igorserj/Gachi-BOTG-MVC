#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QtSql>

int main(int argc, char *argv[])
{
#if QT_VERSION < QT_VERSION_CHECK(6, 0, 0)
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
#endif
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    const QUrl url(QStringLiteral("qrc:/main.qml"));
    QObject::connect(
        &engine,
        &QQmlApplicationEngine::objectCreated,
        &app,
        [url](QObject *obj, const QUrl &objUrl) {
            if (!obj && url == objUrl)
                QCoreApplication::exit(-1);
        },
        Qt::QueuedConnection);
    engine.load(url);

    return app.exec();
}
// #include <QGuiApplication>
// #include <QQuickView>

// int main(int argc, char **argv)
// {
//     {
//         // Set OpenGL requirements
//         QSurfaceFormat format = QSurfaceFormat::defaultFormat();
// #ifndef QT_OPENGL_ES_2
//         format.setVersion(4, 1);
//         format.setProfile(QSurfaceFormat::CoreProfile);
//         format.setSamples(4);
// #else
//         format.setVersion(3, 0);
//         format.setProfile(QSurfaceFormat::NoProfile);
//         format.setRenderableType(QSurfaceFormat::OpenGLES);
// #endif
//         QSurfaceFormat::setDefaultFormat(format);
//     }
//     QGuiApplication app(argc, argv);

//     QQuickView view;

//     view.resize(640, 480);
//     QString title = "Gachimuchi Boss of this gym";
//     view.setTitle(title);
//     view.setResizeMode(QQuickView::SizeRootObjectToView);
//     view.setSource(QUrl("qrc:/main.qml"));
//     view.show();

//     return app.exec();
// }
