# 🎮 GameStore API

API backend desenvolvida em **NestJS** para gerenciamento de uma loja de games, com foco em **produtos**, **categorias** e boas práticas de arquitetura backend.

O projeto foi construído com **NestJS + TypeORM**, utilizando **DTOs**, **injeção de dependência**, **relacionamentos entre entidades** e organização modular, seguindo padrões utilizados em projetos profissionais.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (recomendado: v20 LTS)
- **NestJS**
- **TypeORM**
- **MySQL / PostgreSQL** (via TypeORM)
- **TypeScript**
- **reflect-metadata**

---

## 🧱 Arquitetura do Projeto

O projeto segue a arquitetura modular do NestJS:

```
src/
 ├── product/
 │   ├── controllers/
 │   ├── services/
 │   ├── entities/
 │   ├── dto/
 │   └── product.module.ts
 │
 ├── category/
 │   ├── controllers/
 │   ├── services/
 │   ├── entities/
 │   ├── dto/
 │   └── category.module.ts
 │
 ├── app.module.ts
 └── main.ts
```

Cada módulo é responsável pelo seu próprio domínio, respeitando o princípio de **responsabilidade única**.

---

## 🗂️ Entidades Principais

### 📦 Product
- Representa um produto da loja
- Relacionamento **ManyToOne** com Category

### 🏷️ Category
- Representa a categoria do produto
- Relacionamento **OneToMany** com Product

---

## 🔗 Relacionamentos

- Um **produto** pertence a **uma categoria**
- Uma **categoria** pode possuir **vários produtos**

O relacionamento é gerenciado via TypeORM utilizando `@ManyToOne` e `@OneToMany`.

---

## 📥 Criação de Produto (Exemplo)

### Endpoint
```
POST /products
```

### Body (JSON)
```json
{
  "name": "God of War Ragnarök",
  "price": 299.90,
  "categoryId": 1
}
```

O backend valida a categoria antes de salvar o produto, garantindo integridade dos dados.

---

## 🧠 Boas Práticas Aplicadas

- Uso de **DTOs** para entrada de dados
- Validação de relacionamentos antes de persistir
- Injeção correta de repositórios com `@InjectRepository`
- Separação clara entre **Controller**, **Service** e **Entity**
- Código organizado e escalável

---

## ▶️ Como Rodar o Projeto

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Configurar banco de dados
Crie um arquivo `.env` com as variáveis:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=senha
DB_NAME=gamestore
```

### 3️⃣ Rodar a aplicação
```bash
npm run start:dev
```

A API ficará disponível em:
```
http://localhost:3000
```

---

## ⚠️ Observações Importantes

- Recomenda-se utilizar **Node.js v20 LTS**
- Node v22 pode causar problemas com decorators e metadata no NestJS
- Sempre importar `reflect-metadata` no `main.ts`

---

## 📌 Próximos Passos (Evoluções Futuras)

- Autenticação (JWT)
- Controle de usuários
- Upload de imagens de produtos
- Paginação e filtros
- Documentação com Swagger

---

## 👨‍💻 Autor

Projeto desenvolvido para fins de estudo e prática em **NestJS + TypeORM**, aplicando conceitos reais de backend utilizados no mercado.

---

✨ *Sinta-se à vontade para clonar, estudar e evoluir este projeto.*

