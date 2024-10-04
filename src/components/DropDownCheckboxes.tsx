"use client";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import React, { useState } from 'react';
import * as LucideReact from 'lucide-react';

// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// type Checked = DropdownMenuCheckboxItemProps["checked"];

type CheckboxOptionList<T> = T[];

type CheckboxOption = {
    title?: string;
    Icon?: string;
    options?: CheckboxOptionList<CheckboxOption & { state?: boolean, setState?: ((val: boolean) => void) }>;
}

export function DropdownMenuCheckboxes({
    title = 'Button',
    Icon = undefined,
    options = []
}: CheckboxOption) {
    const IconComponent = !Icon ? null : LucideReact[Icon];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded">
            {IconComponent && (
                <IconComponent
                    width={20}
                    height={20}
                    style={{
                        width: '1rem',
                        height: '1rem'
                    }}
                />
            )}
            {title}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent hideWhenDetached className="bg-primary_layout text-primary_color">
        {options.map((opt, i: number) => {
            const IconElement = !opt.Icon ? null : LucideReact[opt.Icon];

            if(!opt.options) {
                return (
                    <DropdownMenuCheckboxItem
                        key={i}
                        className="flex items-center gap-1"
                        checked={opt.state}
                        onCheckedChange={opt.setState}
                        onClickCapture={(e) => {
                            e.stopPropagation();
                            opt.setState(!opt.state);
                        }}
                    >
                        {IconElement && (
                            <IconElement
                                width={20}
                                height={20}
                                style={{
                                    width: '1rem',
                                    height: '1rem'
                                }}
                            />
                        )}
                        {opt.title}
                    </DropdownMenuCheckboxItem>
                );
            }

            return (
                <React.Fragment key={i}>
                    {IconElement && (
                        <IconElement
                            width={20}
                            height={20}
                            style={{
                                width: '1rem',
                                height: '1rem'
                            }}
                            key={'icon-' + i}
                        />
                    )}
                    <DropdownMenuLabel key={'label-' + i}>{opt.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator key={'separator-' + i} className="bg-fond" />
                    {opt.options.map((el: CheckboxOption & { state?: boolean, setState?: ((val: boolean) => void) }, index: number) => (
                        <DropdownMenuCheckboxItem
                            key={'item-' + i + '-option-' + index}
                            checked={el.state}
                            onCheckedChange={el.setState}
                            onClickCapture={(e) => {
                                e.stopPropagation();
                                el.setState(!el.state);
                            }}
                        >
                            {el.title}
                        </DropdownMenuCheckboxItem>
                    ))}
                </React.Fragment>
            );
        })}{/* 
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-fond" />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}