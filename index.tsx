import React from 'react'
import { ContentCopy } from '@mui/icons-material'
import { RadioGroup, FormControl, useTheme, ThemeProvider } from '@mui/material'

import { copyToClipboard, DigitalQRCode } from 'components'
import * as Styled from './styles'
import Toast from '../../common/Toast'
import { ClipboardStatus } from './types'
import DownloadButtons from './DownloadButtons'
import QRCodeImage from '../../../__mocks__/QR'
import ModeSwitch from '../../common/ModeSwitch'
import { darkTheme, lightTheme } from '../../app/theme'
import useGetQRLink from '../../app/hooks/useGetQRLink'
import { downloadPNG, downloadSVG } from '../../app/helpers/imageExport'

const defaultClipboardStatus: ClipboardStatus = {
  open: false,
  message: '',
  severity: 'success',
}

const QRCode: React.FunctionComponent = () => {
  const theme = useTheme()
  const QRLink = useGetQRLink()
  const svgRef = React.useRef<HTMLDivElement>(null)

  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [value, setValue] = React.useState<'digital' | 'print'>('digital')
  const [clipboardStatus, setClipboardStatus] = React.useState<ClipboardStatus>(
    defaultClipboardStatus,
  )

  const isDigital = value === 'digital'

  const handleModeChange = mode => setIsDarkMode(mode === 'dark')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as 'digital' | 'print')
  }

  const handleCopyToClipboard = (url: string) => {
    const { message, severity } = copyToClipboard(url)
    setClipboardStatus({
      message,
      severity,
      open: true,
    })
  }

  const handleClipboardToastClose = () => {
    setClipboardStatus(defaultClipboardStatus)
  }

  return (
    <Styled.TabWrap>
      {(isDigital && (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <DigitalQRCode isDarkMode={isDarkMode} />
        </ThemeProvider>
      )) || (
        <Styled.QRPrintWrap ref={svgRef}>
          <QRCodeImage
            width='20rem'
            height='20rem'
            dataCy='qr-code__image'
            fill={theme.palette.text.primary}
          />
        </Styled.QRPrintWrap>
      )}

      <Styled.DisplayOptions>
        <FormControl>
          <RadioGroup
            row
            value={value}
            onChange={handleChange}
            aria-labelledby='QR-code-variant-radio-button'
          >
            <Styled.FormControlLabel
              value='digital'
              label='Digital Display'
              control={<Styled.Radio />}
            />
            <Styled.FormControlLabel
              value='print'
              label='Print'
              control={<Styled.Radio />}
            />
          </RadioGroup>
        </FormControl>

        {(isDigital && (
          <>
            <Styled.InputWrap>
              <Styled.TextField
                disabled
                fullWidth
                margin='normal'
                variant='filled'
                defaultValue={QRLink}
                id='outlined-disabled'
                label='Digital Menu Url'
                helperText='You cannot change your url'
              />
              <Styled.IconButton
                component='button'
                onClick={() => handleCopyToClipboard(QRLink)}
              >
                <ContentCopy fontSize='medium' />
              </Styled.IconButton>
            </Styled.InputWrap>

            <ModeSwitch onChange={handleModeChange} isDarkMode={isDarkMode} />
          </>
        )) || (
          <DownloadButtons
            handleSvgDownload={() => downloadSVG(svgRef.current.innerHTML)}
            handlePngDownload={() => downloadPNG(svgRef.current.innerHTML)}
          />
        )}

        <Toast
          message={clipboardStatus.message}
          open={clipboardStatus.open}
          severity={clipboardStatus.severity}
          handleClose={handleClipboardToastClose}
        />
      </Styled.DisplayOptions>
    </Styled.TabWrap>
  )
}

export default QRCode
