type InlineSvgProps = {
  url: string;
  className?: string;
  title?: string;
};

export default async function InlineSvg({ url, className, title }: InlineSvgProps) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`InlineSvg: Failed to fetch ${url}, status: ${response.status}`);
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('svg')) {
      console.error(`InlineSvg: URL ${url} is not an SVG (content-type: ${contentType})`);
      return null;
    }

    let svgContent = await response.text();

    // Add title for accessibility if provided
    if (title && !svgContent.includes('<title>')) {
      svgContent = svgContent.replace(/<svg([^>]*)>/, `<svg$1><title>${title}</title>`);
    }

    // Add className to the SVG element if provided
    if (className) {
      svgContent = svgContent.replace(/<svg([^>]*)>/, (match, attrs) => {
        if (attrs.includes('class=')) {
          return match.replace(/class="([^"]*)"/, `class="$1 ${className}"`);
        }
        return `<svg${attrs} class="${className}">`;
      });
    }

    return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
  } catch (error) {
    console.error(`InlineSvg: Error fetching ${url}:`, error);
    return null;
  }
}
