import * as React from 'react';
import classNames from 'classnames';
import type {PanelSharedProps} from 'rc-picker/lib/interface';
import RangeContext from 'rc-picker/lib/RangeContext';
import DatePanel from '../DatePanel';
import useRowClassName from "../../hooks/useRowClassName";

export type WeekPanelProps<DateType> = PanelSharedProps<DateType>;

function WeekPanel<DateType>(props: WeekPanelProps<DateType>) {
    const {prefixCls, generateConfig, locale, value} = props;
    const {rangedValue, hoverRangedValue} = React.useContext(RangeContext);

    // Render additional column
    const cellPrefixCls = `${prefixCls}-cell`;
    const prefixColumn = (date: DateType) => (
        <td
            key="week"
            className={classNames(cellPrefixCls, `${cellPrefixCls}-week`)}
        >
            {generateConfig.locale.getWeek(locale.locale, date)}
        </td>
    );

    // Add row className
    const rowPrefixCls = `${prefixCls}-week-panel-row`;
    // const rowClassName = (date: DateType) =>
    //     classNames(rowPrefixCls, {
    //         [`${rowPrefixCls}-selected`]: isSameWeek(
    //             generateConfig,
    //             locale.locale,
    //             value,
    //             date,
    //         ),
    //     });
    const getRowClassName = useRowClassName({
        rowPrefixCls,
        value,
        generateConfig,
        locale: locale.locale,
        rangedValue,
        hoverRangedValue,
    });
    const rowClassName = (date: DateType) => classNames(rowPrefixCls, {
        ...getRowClassName(date)
    })
    return (
        <DatePanel
            {...props}
            panelName="week"
            prefixColumn={prefixColumn}
            rowClassName={rowClassName}
            keyboardConfig={{
                onLeftRight: null,
            }}
        />
    );
}

export default WeekPanel;
