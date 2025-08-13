# Usa Python 3.10 que é compatível com mediapipe
FROM python:3.10-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . /app

# Atualiza pip e instala as dependências
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta que seu Flask vai rodar
EXPOSE 5000

# Comando pra iniciar o Flask usando gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
