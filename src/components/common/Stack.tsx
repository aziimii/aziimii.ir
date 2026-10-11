import { Stack as MuiStack, type StackProps as MuiStackProps } from '@mui/material'
import type { ResponsiveStyleValue } from '@mui/system'
import type { SxProps, Theme } from '@mui/material/styles'

/**
 * MUI v9's Stack only accepts direction/spacing/divider/useFlexGap/sx.
 * This wrapper restores the alignment helpers the portfolio uses
 * (justifyContent, alignItems, flexWrap, gap) by folding them into `sx`.
 */

type AlignValue = ResponsiveStyleValue<
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
>

export interface StackProps extends Omit<MuiStackProps, 'sx'> {
  justifyContent?: AlignValue
  alignItems?: AlignValue
  flexWrap?: ResponsiveStyleValue<'nowrap' | 'wrap' | 'wrap-reverse'>
  gap?: ResponsiveStyleValue<number | string>
  sx?: SxProps<Theme>
}

export function Stack({
  justifyContent,
  alignItems,
  flexWrap,
  gap,
  sx,
  children,
  ...rest
}: StackProps) {
  const layout: Record<string, unknown> = { justifyContent, alignItems, flexWrap, gap }
  const styles: SxProps<Theme> = Array.isArray(sx)
    ? [layout, ...sx]
    : [layout, ...(sx ? [sx] : [])]

  return (
    <MuiStack sx={styles} {...rest}>
      {children}
    </MuiStack>
  )
}

export default Stack
