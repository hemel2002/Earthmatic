export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data]

  return (
    <>
      {items.map((item, index) => (
        // JSON-LD requires raw <script> injection; content is build-time
        // generated from typed builders, never user input.
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
