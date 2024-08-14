export const fetchAddress = async (latitude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.display_name) {
      return data.display_name;
    } else {
      console.error("逆ジオコーディングに失敗しました:", data);
      return null;
    }
  } catch (error) {
    console.error("逆ジオコーディング中にエラーが発生しました:", error);
    return null;
  }
};

export const formatAddress = (address: string) => {
  const addressParts = address.split(",").map((part) => part.trim());

  const ward = addressParts.find((part) => part.includes("区"));
  const city = addressParts.find((part) => part.includes("市"));
  const prefecture = addressParts.find(
    (part) => part.includes("府") || part.includes("都") || part.includes("県")
  );

  const otherParts = addressParts.filter(
    (part) =>
      !part.includes("市") &&
      !part.includes("区") &&
      !part.includes("府") &&
      !part.includes("都") &&
      !part.includes("県") &&
      !part.match(/\d/)
  );

  const formattedAddress = `${city || ""}${ward || ""}${otherParts
    .reverse()
    .join("")}`;

  return formattedAddress;
};
