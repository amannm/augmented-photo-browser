export type Point2D = [number, number];

export type Point3D = [number, number, number];

export interface AnnotatedPredictionValues {
    faceInViewConfidence: number;
    boundingBox: {
        topLeft: Point2D;
        bottomRight: Point2D;
    };
    mesh: Point3D[];
    scaledMesh: Point3D[];
    annotations: {
        [key: string]: Point3D[];
    };
}