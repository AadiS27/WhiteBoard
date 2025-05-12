import { colorToHex } from "@/lib/utils";
import { Layer } from "@/types/canvas";

interface EllipseProps {
    id: string;
    layer: Layer; 
    onLayerPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor: string | null;
}

export const Ellipse = ({
    id,
    layer,
    onLayerPointerDown,
    selectionColor,
}: EllipseProps) => {
    const { x, y, width, height, fill } = layer;

    return (
        <ellipse
            className="drop-shadow-md"
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`,
            }}
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            strokeWidth={1}
            fill={fill ? colorToHex(fill) : "#fff"}
            stroke={selectionColor || "transparent"}
        />
    );
}