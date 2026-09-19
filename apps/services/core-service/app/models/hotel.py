import uuid
from typing import List

from sqlalchemy import JSON, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.tutorial import Base


class Cidade(Base):
    __tablename__ = "cidades"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    nome: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    estado: Mapped[str] = mapped_column(
        String(2),
        nullable=False,
    )

    limite_territorial: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True,
)

    hoteis: Mapped[List["Hotel"]] = relationship(
        back_populates="cidade",
        cascade="all, delete-orphan",
    )


class Hotel(Base):
    __tablename__ = "hoteis"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    nome: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    cidade_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("cidades.id", ondelete="CASCADE"),
        nullable=False,
    )

    categoria_estrelas: Mapped[int] = mapped_column(
        nullable=False,
    )

    cidade: Mapped["Cidade"] = relationship(
        back_populates="hoteis",
    )
