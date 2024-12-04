from enum import Enum

class EnumClothingFitTypes(Enum):
    REGULAR = "Regular"
    TAPERED = "Tapered"
    SLIM = "Slim"
    ATHLETIC = "Athletic"
    MODERN = "Modern"
    CLASSIC = "Classic"
    BAGGY = "Baggy"
    RELAXED = "Relaxed"
    OVERSIZED = "Oversized"


class EnumClothingPatterns(Enum):
    PLAID = "Plaid"
    CAMOUFLAGE = "Camouflage"
    SOLID = "Solid"
    PAISLEY = "Paisley"
    ABSTRACT = "Abstract"
    STRIPED = "Striped"
    POLKADOT = "Polka Dot"
    KNITTED = "Knitted"
    CHECKERED = "Checkered"

class EnumClothingSizeVarations(Enum):
    XX_SMALL = "XX Small"
    X_SMALL = "X Small"
    SMALL = "Small"
    MEDIUM = "Medium"
    LARGE = "Large"
    X_LARGE = "X Large"
    XX_LARGE = "XX Large"
    XXX_LARGE = "XXX Large"

class EnumClothingColorVariations(Enum):
    RED = "red"
    BLUE ="blue"
    BLACK = "black"
