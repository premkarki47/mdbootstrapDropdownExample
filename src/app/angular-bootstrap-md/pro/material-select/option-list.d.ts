import { Option } from './option';
import { IOption } from './option-interface';
export declare class OptionList {
    private _options;
    private _highlightedOption;
    private _hasShown;
    static equalValues(v0: Array<string>, v1: Array<string>): boolean;
    constructor(options: Array<IOption>);
    readonly options: Array<Option>;
    getOptionsByValue(value: string): Array<Option>;
    value: Array<string>;
    readonly selection: Array<Option>;
    select(option: Option, multiple: boolean): void;
    deselect(option: Option): void;
    clearSelection(): void;
    readonly filtered: Array<Option>;
    filter(term: string): boolean;
    private resetFilter();
    readonly highlightedOption: Option;
    highlight(): void;
    highlightOption(option: Option): void;
    highlightNextOption(): void;
    highlightPreviousOption(): void;
    private clearHighlightedOption();
    private getHighlightedIndexFromList(options);
    getHighlightedIndex(): number;
    readonly hasShown: boolean;
    hasSelected(): boolean;
    hasShownSelected(): boolean;
    private getFirstShown();
    private getFirstShownSelected();
}
