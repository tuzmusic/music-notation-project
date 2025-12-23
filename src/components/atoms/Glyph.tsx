type GlyphProps = Pick<React.SVGTextElementAttributes<SVGTextElement>, 'x' | 'y' | 'fontSize'>

export function Glyph({ children, ...props }: React.PropsWithChildren<GlyphProps>) {
  return (
    <text fontFamily="Bravura" {...props}>
      {children}
    </text>
  );
}
