const component = () => {
  // Extracting the SVG through the wrappping div 
    const svgRef = React.useRef<HTMLDivElement>(null)

  return (
      <div>
        {/* Download button passing in the SVG as props */}
        <button onClick={() => downloadSVG(svgRef.current.innerHTML)}>
          Download SVG
        </button>
        <button
          onClick={() => downloadPNG(svgRef.current.innerHTML, "image/png")}
        >
          Download PNG
        </button>
        <button
          onClick={() => downloadPNG(svgRef.current.innerHTML, "image/jpeg")}
        >
          Download JPEG
        </button>
        <div style={{ height: "250px", padding: "50px" }} ref={svgRef}>
          <TigerSVG />
        </div>
      </div>
  )
}

export default QRCode
