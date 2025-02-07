import React from 'react';
import { AssistantClientCustomizedCommand, AssistantSmartAppData } from '@salutejs/client';

import { isPlasmaAppAction } from '../store/guards';

import { useAssistantOnData } from './useAssistantOnData';

// @deprecated works only with PlasmaApp
export function useAssistantOnSmartAppData<T extends AssistantSmartAppData = AssistantSmartAppData>(
    callback: (command: T['smart_app_data']) => void,
): void {
    const onDataHandler = React.useCallback(
        (command: AssistantClientCustomizedCommand<T>) => {
            if (command.type === 'smart_app_data' && !isPlasmaAppAction(command.smart_app_data)) {
                callback(command.smart_app_data);
            }
        },

        [callback],
    );
    useAssistantOnData(onDataHandler);
}
