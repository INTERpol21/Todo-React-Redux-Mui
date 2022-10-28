import { AnyAction } from '@reduxjs/toolkit';

export interface IModel {
    id: string;
    text: string;
    isFinished: boolean;
    createdAt?: string;
    updatedAt?: string;
    isTextShowed?: boolean;
}
//Omit принимает тип и объединение ключей, после чего возвращает новый тип, из которого исключены свойства, описанные ключами
//То есть выкидываем ключ text из интерфейса IModel
export type TActionSlice = Omit<IModel, 'text'>;
export type TUpdateTextShowed = Omit<TActionSlice, 'isFinished'>;

export interface IColumnLayoutProps {
    labelText?: string;
    label?:string;
    defaultValue?:string;
    addHandler: (v: string) => AnyAction;
    removeHandler: (v: string) => AnyAction;
    completedHandler: (v: TActionSlice) => AnyAction;
    selectorState: IModel[];
    droppableId: string;
    updateTextShowed: (v: TUpdateTextShowed) => AnyAction;
}