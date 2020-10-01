export enum TickPositionEnum {
    Top,
    Left,
    Right,
    Bottom,
    LeftTop,
    None,
}

export type Tick = {
    tickDescription: string;
    tickLabel: string;
    tickLabelPosition: TickPositionEnum;
    description: string;
    descriptionPosition: TickPositionEnum;
    imagePosition: number;
    isActive?: boolean;
    customOpenCallback?: () => void;
    customCloseCallBack?: () => void;
};
