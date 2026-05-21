import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function observarUsuarioLogado(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function criarConta(nome, email, senha) {
  const credencial = await createUserWithEmailAndPassword(auth, email, senha);
  const usuario = credencial.user;

  await setDoc(doc(db, "usuarios", usuario.uid), {
    nome,
    email,
    avatarImage: "",
    folders: [],
    criadoEm: serverTimestamp(),
    configuracoes: {
      tema: "dark",
      notificacoesAtivadas: true,
      sidebarCollapsed: false,
    },
  });

  return usuario;
}

export async function entrar(email, senha) {
  const credencial = await signInWithEmailAndPassword(auth, email, senha);
  return credencial.user;
}

export async function sair() {
  await signOut(auth);
}

export function observarPerfilUsuario(userId, callback) {
  const usuarioRef = doc(db, "usuarios", userId);

  return onSnapshot(usuarioRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.data() : null);
  });
}

export async function salvarPerfilUsuario(userId, dados) {
  const usuarioRef = doc(db, "usuarios", userId);

  await setDoc(usuarioRef, {
    ...dados,
    atualizadoEm: serverTimestamp(),
  }, { merge: true });
}

export async function criarTarefa(userId, tarefa) {
  const tarefasRef = collection(db, "usuarios", userId, "tarefas");

  const documento = await addDoc(tarefasRef, {
    ...tarefa,
    criadaEm: serverTimestamp(),
    atualizadaEm: serverTimestamp(),
  });

  return documento.id;
}

export function observarTarefas(userId, callback) {
  const tarefasRef = collection(db, "usuarios", userId, "tarefas");
  const consulta = query(tarefasRef, orderBy("time", "asc"));

  return onSnapshot(consulta, (snapshot) => {
    const tarefas = snapshot.docs.map((documento) => ({
      ...documento.data(),
      id: documento.id,
    }));

    callback(tarefas);
  });
}

export async function atualizarTarefa(userId, tarefaId, dados) {
  const tarefaRef = doc(db, "usuarios", userId, "tarefas", tarefaId);

  await updateDoc(tarefaRef, {
    ...dados,
    atualizadaEm: serverTimestamp(),
  });
}

export async function excluirTarefa(userId, tarefaId) {
  const tarefaRef = doc(db, "usuarios", userId, "tarefas", tarefaId);
  await deleteDoc(tarefaRef);
}
