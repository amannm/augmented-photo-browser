
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection"
import * as bodyPix from "@tensorflow-models/body-pix"

import { AnnotatedPredictionValues } from "./types";
import { SemanticPartSegmentation } from "@tensorflow-models/body-pix";



export async function detectFaceLandmarks(image: HTMLImageElement): Promise<AnnotatedPredictionValues[]> {
    const model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    const annotatedPredictions = await model.estimateFaces({
        input: image
    });
    const results: AnnotatedPredictionValues[] = [];
    for (let i = 0; i < annotatedPredictions.length; i++) {
        const annotatedPrediction = annotatedPredictions[i];
        // narrow and remap disambiguated properties onto clone of inaccessible type
        if (annotatedPrediction.kind === "MediaPipePredictionValues") {
            results.push({
                faceInViewConfidence: annotatedPrediction.faceInViewConfidence,
                boundingBox: annotatedPrediction.boundingBox,
                mesh: annotatedPrediction.mesh,
                scaledMesh: annotatedPrediction.scaledMesh,
                annotations: annotatedPrediction.annotations
            });
        }
    }
    return results;
}


export async function detectBodyParts(image: HTMLImageElement, internalResolution: number, segmentationThreshold: number): Promise<SemanticPartSegmentation> {
    const internalResolutionMapper = () => {
        switch (internalResolution) {
            case 0.25:
                return 'low';
            case 0.5:
                return 'medium';
            case 0.75:
                return 'high';
            case 1.0:
                return 'full';
            default:
                throw 'unsupported internal resolution setting: ' + internalResolution;
        }
    };
    const net = await bodyPix.load({
        architecture: 'ResNet50',
        outputStride: 16,
        quantBytes: 4
    });
    return await net.segmentPersonParts(image, {
        flipHorizontal: false,
        internalResolution: internalResolutionMapper(),
        segmentationThreshold: segmentationThreshold
    });
}