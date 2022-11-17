// Generate platform icons based on it name
export function getPlatformsIcons(platforms) {
  if (platforms) {
    return platforms.map((platform, index) => {
      const _platform = platform.toLowerCase();

      if (_platform === "windows") {
        return <i className="bi bi-windows" key={index}></i>;
      } else if (_platform === "steam") {
        return <i className="bi bi-steam" key={index}></i>
      }
    });
  }
}

export const brlCurrencyFormatter =
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });