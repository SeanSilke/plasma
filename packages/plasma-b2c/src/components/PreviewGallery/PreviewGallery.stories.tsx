import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator } from '@salutejs/plasma-sb-utils';
import { IconTrashFilled, IconTrash } from '@salutejs/plasma-icons';
import { Icon } from '@salutejs/plasma-icons/Icon';
import { surfaceSolid01 } from '@salutejs/plasma-tokens-b2c';

import { arrayItemRemoving, arrayItemSelecting, arrayItemSwapping } from './utils';
import type { PreviewGalleryProps } from './PreviewGallery';
import type { PreviewGalleryItemProps } from './PreviewGalleryItemBase';

import { PreviewGallery } from '.';

const StyledAddButton = styled.div`
    width: 100%;
    background: ${surfaceSolid01};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    user-select: none;
    padding-top: 56.25%;
`;

const StyledIcon = styled(Icon)`
    position: absolute;
    top: calc(50% - 12px);
    left: calc(50% - 12px);
`;

export const AddButton = () => {
    return (
        <StyledAddButton>
            <StyledIcon icon="plus" />
        </StyledAddButton>
    );
};

export default {
    title: 'Controls/PreviewGallery',
    component: PreviewGallery,
    argTypes: {
        items: {
            table: {
                disable: true,
            },
        },
        deleteIcon: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [InSpacingDecorator],
} as Meta;

const StyledWrapper = styled.div`
    width: 23.75rem;
`;

interface StoryProps extends PreviewGalleryProps {}

const images: Array<PreviewGalleryItemProps> = [
    { id: 1 * Math.random(), image: './images/320_320_0.jpg', caption: '3:24' },
    { id: 2 * Math.random(), image: './images/320_320_1.jpg', isSelected: true },
    { id: 3 * Math.random(), image: './images/320_320_2.jpg', actionDisabled: true },
    { id: 4 * Math.random(), image: './images/320_320_3.jpg' },
    { id: 5 * Math.random(), image: './images/320_320_4.jpg' },
    { id: 6 * Math.random(), image: './images/320_320_4.jpg', status: 'error' },
    { id: 7 * Math.random(), component: <AddButton />, customClickHandle: () => {} },
];

export const Selectable: Story<StoryProps> = ({ ...rest }) => {
    const [items, setItems] = useState(images);

    const onItemRemove = useCallback((id) => {
        setItems((oldItems) => {
            const newItems = arrayItemRemoving(oldItems, id);

            if (newItems.length === 1) {
                newItems[0].isSelected = true;
            }

            return newItems;
        });
    }, []);

    const onItemClick = useCallback((id) => {
        setItems((oldItems) => {
            const newItems = arrayItemSelecting(oldItems, id);
            return newItems;
        });
    }, []);

    return (
        <StyledWrapper>
            <PreviewGallery
                items={items}
                onItemAction={onItemRemove}
                actionIcon={<IconTrashFilled size="xs" color="inherit" />}
                onItemClick={onItemClick}
                {...rest}
            />
        </StyledWrapper>
    );
};

export const Draggable: Story<StoryProps> = ({ ...rest }) => {
    const [items, setItems] = useState(images);

    const onItemRemove = useCallback((id) => {
        setItems((oldItems) => {
            const newItems = arrayItemRemoving(oldItems, id);

            if (newItems.length === 1) {
                newItems[0].isSelected = true;
            }

            return newItems;
        });
    }, []);

    const onItemsSortEnd = useCallback(({ oldIndex, newIndex }) => {
        setItems((oldItems) => {
            const newItems = arrayItemSwapping(oldItems, oldIndex, newIndex);
            return newItems;
        });
    }, []);

    return (
        <StyledWrapper>
            <PreviewGallery
                interactionType="draggable"
                items={items}
                actionIcon={<IconTrash size="xs" color="inherit" />}
                onItemAction={onItemRemove}
                onItemsSortEnd={onItemsSortEnd}
                {...rest}
            />
        </StyledWrapper>
    );
};
