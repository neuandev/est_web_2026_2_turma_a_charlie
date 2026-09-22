from sqlalchemy.orm import Session

from app.repositories.hotel_repository import CidadeRepository, HotelRepository


class CidadeService:
    """Regras de negocio de Cidade."""

    def __init__(self, db: Session):
        self.repository = CidadeRepository(db)

    def create(self, payload):
        return self.repository.create(
            nome=payload.nome,
            estado=payload.estado,
        )

    def list(self):
        return self.repository.list()

    def get_by_id(self, cidade_id):
        return self.repository.get_by_id(cidade_id)

    def get_by_nome(self, nome):
        return self.repository.get_by_nome(nome)


class HotelService:
    """Regras de negocio de Hotel."""

    def __init__(self, db: Session):
        self.repository = HotelRepository(db)

    def create(self, payload):
        return self.repository.create(
            nome=payload.nome,
            cidade_id=payload.cidade_id,
            categoria_estrelas=payload.categoria_estrelas,
        )

    def list(self):
        return self.repository.list()

    def list_by_cidade(self, cidade_id):
        return self.repository.list_by_cidade(cidade_id)

    def get_by_id(self, hotel_id):
        return self.repository.get_by_id(hotel_id)
