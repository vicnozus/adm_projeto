from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# rota principal
@app.route("/")
def index():
    return render_template("index.html")

# página sobre
@app.route("/sobre")
def sobre():
    return render_template("sobre.html")

# página de contato com envio de formulário
@app.route("/contato", methods=["GET", "POST"])
def contato():
    if request.method == "POST":
        nome = request.form.get("nome")
        email = request.form.get("email")
        mensagem = request.form.get("mensagem")
        print(f"Recebido: {nome}, {email}, {mensagem}")  # só pra testar
        return redirect(url_for("index"))
    return render_template("contato.html")

if __name__ == "__main__":
    app.run(debug=True)
