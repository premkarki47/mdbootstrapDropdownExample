import { Component, Output, EventEmitter, ViewChildren, HostBinding, Input, ElementRef } from '@angular/core';
import { TabsetConfig } from './tabset.config';
import { RippleDirective } from './ripple-effect.component';
var TabsetComponent = (function () {
    function TabsetComponent(config, ripple) {
        this.ripple = ripple;
        this.tabs = [];
        this.classMap = {};
        this.clazz = true;
        this.showBsTab = new EventEmitter();
        this.shownBsTab = new EventEmitter();
        this.hideBsTab = new EventEmitter();
        this.hiddenBsTab = new EventEmitter();
        Object.assign(this, config);
    }
    Object.defineProperty(TabsetComponent.prototype, "vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    TabsetComponent.prototype.setActiveTab = function (index) {
        this.tabs[index - 1].active = true;
    };
    Object.defineProperty(TabsetComponent.prototype, "justified", {
        get: function () {
            return this._justified;
        },
        set: function (value) {
            this._justified = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsetComponent.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    TabsetComponent.prototype.click = function (event, index) {
        var prev = this.tabEl.toArray()[this.getActive()];
        var clicked = this.tabEl.toArray()[index];
        this.hideBsTab.emit({
            target: clicked,
            relatedTarget: prev
        });
        this.showBsTab.emit({
            target: clicked,
            relatedTarget: prev
        });
        this.setActiveTab(index + 1);
        if (this.contentClass !== 'vertical') {
            this.ripple.el = clicked;
            this.ripple.click(event);
        }
        this.hiddenBsTab.emit({
            target: clicked,
            relatedTarget: prev
        });
        this.shownBsTab.emit({
            target: clicked,
            relatedTarget: prev
        });
    };
    TabsetComponent.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
    };
    TabsetComponent.prototype.getActive = function () {
        var tabs = this.tabs.map(function (object, index) {
            return {
                index: index,
                object: object
            };
        });
        for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
            var tab = tabs_1[_i];
            if (tab.object.active) {
                return tab.index;
            }
        }
    };
    TabsetComponent.prototype.addTab = function (tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    TabsetComponent.prototype.removeTab = function (tab) {
        var index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        if (tab.active && this.hasAvailableTabs(index)) {
            var newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        tab.removed.emit(tab);
        this.tabs.splice(index, 1);
    };
    TabsetComponent.prototype.getClosestTabIndex = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (var step = 1; step <= tabsLength; step += 1) {
            var prevIndex = index - step;
            var nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    };
    TabsetComponent.prototype.hasAvailableTabs = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (var i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    };
    TabsetComponent.prototype.setClassMap = function () {
        this.classMap = {
            'nav-stacked': this.vertical,
            'nav-justified': this.justified,
        };
    };
    TabsetComponent.prototype.listGet = function () {
        if (this.vertical) {
            this.listGetClass = 'col-md-3';
        }
        else {
            this.listGetClass = 'col-md-12';
        }
    };
    TabsetComponent.prototype.tabsGet = function () {
        if (this.vertical) {
            this.tabsGetClass = 'col-md-9';
        }
        else {
            this.tabsGetClass = 'col-md-12';
        }
    };
    TabsetComponent.prototype.ngOnInit = function () {
        this.listGet();
        this.tabsGet();
    };
    return TabsetComponent;
}());
export { TabsetComponent };
TabsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-tabset',
                templateUrl: 'tabset.component.html',
                providers: [RippleDirective]
            },] },
];
TabsetComponent.ctorParameters = function () { return [
    { type: TabsetConfig, },
    { type: RippleDirective, },
]; };
TabsetComponent.propDecorators = {
    'clazz': [{ type: HostBinding, args: ['class.tab-container',] },],
    'buttonClass': [{ type: Input },],
    'contentClass': [{ type: Input },],
    'tabEl': [{ type: ViewChildren, args: ['tabEl', { read: ElementRef },] },],
    'showBsTab': [{ type: Output },],
    'shownBsTab': [{ type: Output },],
    'hideBsTab': [{ type: Output },],
    'hiddenBsTab': [{ type: Output },],
    'vertical': [{ type: Input },],
    'justified': [{ type: Input },],
    'type': [{ type: Input },],
};
//# sourceMappingURL=tabset.component.js.map